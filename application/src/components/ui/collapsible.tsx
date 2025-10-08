"use client";

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger || (CollapsiblePrimitive as any).Trigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent || (CollapsiblePrimitive as any).Content;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

