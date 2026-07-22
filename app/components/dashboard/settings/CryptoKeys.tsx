import React, { useState } from 'react';
import { useCryptoStore } from '@/store/cryptoStore';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';

export const CryptoKeys = ({ workspaceId }: { workspaceId: string }) => {
  const { apiKeys, createApiKey, deleteApiKey } = useCryptoStore();
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold">Generate New Key</h4>
        <div className="flex gap-2">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Key Name" />
            <Button onClick={() => createApiKey(workspaceId, name)}>Generate</Button>
        </div>
      </Card>
      <div className="grid gap-2">
        {apiKeys.map(key => (
            <Card key={key.id} className="flex justify-between items-center p-3">
                <span>{key.name} - {key.key}</span>
                <Button variant="ghost" onClick={() => deleteApiKey(workspaceId, key.id)}>Delete</Button>
            </Card>
        ))}
      </div>
    </div>
  );
};
