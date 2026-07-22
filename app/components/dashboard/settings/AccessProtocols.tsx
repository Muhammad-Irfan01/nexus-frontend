import React, { useState } from 'react';
import { useCryptoStore } from '@/store/cryptoStore';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';

export const AccessProtocols = ({ workspaceId }: { workspaceId: string }) => {
  const { protocols, createProtocol, deleteProtocol } = useCryptoStore();
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold">Define New Protocol</h4>
        <div className="flex gap-2">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Protocol Name" />
            <Button onClick={() => createProtocol(workspaceId, name, {})}>Create</Button>
        </div>
      </Card>
      <div className="grid gap-2">
        {protocols.map(p => (
            <Card key={p.id} className="flex justify-between items-center p-3">
                <span>{p.name}</span>
                <Button variant="ghost" onClick={() => deleteProtocol(workspaceId, p.id)}>Delete</Button>
            </Card>
        ))}
      </div>
    </div>
  );
};
