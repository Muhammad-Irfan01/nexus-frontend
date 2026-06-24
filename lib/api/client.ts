const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface RequestOptions extends RequestInit {
  useRefreshToken?: boolean;
}

export class ApiError extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Simple locker to prevent multiple concurrent token refresh requests
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}/${endpoint.replace(/^\//, '')}`;
  
  // 1. Resolve authorization header
  const headers = new Headers(options.headers);
  
  if (!headers.has('Authorization')) {
    if (options.useRefreshToken) {
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
      if (refreshToken) {
        headers.set('Authorization', `Bearer ${refreshToken}`);
      }
    } else {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
    }
  }

  // 2. Set default content type if not Form Data
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Handle 401 Unauthorized for token refresh
    if (response.status === 401 && !options.useRefreshToken) {
      return handleUnauthorized(url, config);
    }

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new ApiError(response.statusText, response.status);
      }

      // Extract validation messages or NestJS exception format
      const rawMessage = errorData?.message || errorData?.error || 'An error occurred';
      const message = Array.isArray(rawMessage) 
        ? rawMessage.join(', ') 
        : typeof rawMessage === 'object' && rawMessage.message 
          ? (Array.isArray(rawMessage.message) ? rawMessage.message.join(', ') : rawMessage.message)
          : rawMessage;

      throw new ApiError(message, response.status, errorData);
    }

    // Unpack NestJS response interceptor standard format
    const json = await response.json();
    return (json.success && json.hasOwnProperty('data') ? json.data : json) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error instanceof Error ? error.message : 'Network failure', 500);
  }
}

// Automated JWT Refresh Handler
async function handleUnauthorized<T>(url: string, config: RequestInit): Promise<T> {
  if (typeof window === 'undefined') {
    throw new ApiError('Unauthorized', 401);
  }

  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    handleSessionExpiry();
    throw new ApiError('Unauthorized', 401);
  }

  if (isRefreshing) {
    return new Promise((resolve) => {
      subscribeTokenRefresh((newToken) => {
        const headers = new Headers(config.headers);
        headers.set('Authorization', `Bearer ${newToken}`);
        resolve(fetch(url, { ...config, headers }).then(async (res) => {
          const json = await res.json();
          return json.success && json.hasOwnProperty('data') ? json.data : json;
        }));
      });
    });
  }

  isRefreshing = true;

  try {
    // Call the backend Auth refresh endpoint
    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!refreshRes.ok) {
      throw new Error('Refresh failed');
    }

    const refreshResult = await refreshRes.json();
    const tokenData = refreshResult.success ? refreshResult.data : refreshResult;

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = tokenData;

    localStorage.setItem('access_token', newAccessToken);
    if (newRefreshToken) {
      localStorage.setItem('refresh_token', newRefreshToken);
    }

    onRefreshed(newAccessToken);
    isRefreshing = false;

    // Retry original request
    const headers = new Headers(config.headers);
    headers.set('Authorization', `Bearer ${newAccessToken}`);
    const retryRes = await fetch(url, { ...config, headers });
    const retryJson = await retryRes.json();
    return retryJson.success && retryJson.hasOwnProperty('data') ? retryJson.data : retryJson;
  } catch (err) {
    isRefreshing = false;
    handleSessionExpiry();
    throw new ApiError('Session expired. Please log in again.', 401);
  }
}

function handleSessionExpiry() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // If we're not already on a public auth page, redirect to signin
    if (!window.location.pathname.startsWith('/signin') && !window.location.pathname.startsWith('/signup')) {
      window.location.href = `/signin?expired=true`;
    }
  }
}
