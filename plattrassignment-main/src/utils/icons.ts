import * as Icons from 'lucide-react';

export const ICONS = Object.keys(Icons).filter(icon => 
  !['createLucideIcon', 'default'].includes(icon)
) as (keyof typeof Icons)[];