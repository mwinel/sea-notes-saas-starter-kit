'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function PrivacyDataSettings() {
  const [isPublicProfile, setIsPublicProfile] = useState(false);
  const [dataRetention, setDataRetention] = useState('30');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="public-profile">Public Profile</Label>
          <p className="text-sm text-muted-foreground">
            Make your profile visible to other users
          </p>
        </div>
        <Switch
          id="public-profile"
          checked={isPublicProfile}
          onCheckedChange={setIsPublicProfile}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="data-retention">Data Retention Period</Label>
        <Select value={dataRetention} onValueChange={setDataRetention}>
          <SelectTrigger>
            <SelectValue placeholder="Select retention period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="30">30 days</SelectItem>
            <SelectItem value="90">90 days</SelectItem>
            <SelectItem value="365">1 year</SelectItem>
            <SelectItem value="forever">Forever</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          How long to keep deleted items before permanent removal
        </p>
      </div>
      
      <div className="space-y-2">
        <Label>Data Export</Label>
        <Button variant="outline" className="w-full">
          Download My Data
        </Button>
        <p className="text-sm text-muted-foreground">
          Export all your data in a portable format
        </p>
      </div>
    </div>
  );
}
