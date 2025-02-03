import { SearchIcon } from 'lucide-react';

import { Input } from '../ui/input';

export function Search() {
  return (
    <div className="relative w-64">
      <Input type="search" placeholder="Search..." className="pl-8" />
      <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
