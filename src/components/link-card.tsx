'use client';

import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LinkButton, { type LinkButtonProps } from '@/components/link-button';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Globe, FileText, Map as MapIcon, Package as PackageIcon, FolderOpen, CalendarDays,
  Mail, Send, Camera, ClipboardList, FileCheck, Search, X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SharePointIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 2C9.74 2 7.5 4.24 7.5 7c0 1.48.63 2.81 1.63 3.75C7.4 11.35 6.5 12.9 6.5 14.67V20h11v-5.33c0-1.77-.9-3.32-2.63-3.92C15.87 9.81 16.5 8.48 16.5 7c0-2.76-1.79-5-4-5zm0 2c1.1 0 2 1.34 2 3s-.9 3-2 3-2-1.34-2-3 .9-3 2-3zm-4 10.67c0-1.47 1.79-2.67 4-2.67s4 1.2 4 2.67V18h-8v-3.33z"/>
  </svg>
);

const iconMap = {
  globe: Globe,
  fileText: FileText,
  map: MapIcon,
  package: PackageIcon,
  folderOpen: FolderOpen,
  calendarDays: CalendarDays,
  mail: Mail,
  send: Send,
  camera: Camera,
  clipboardList: ClipboardList,
  fileCheck: FileCheck,
  sharePoint: SharePointIcon,
} as const;

export type IconKey = keyof typeof iconMap;

interface LinkItem {
  href: string;
  text: string;
  variant?: LinkButtonProps['variant'];
  icon?: IconKey;
}

interface AccordionGroup {
  triggerText: string;
  triggerIcon?: IconKey;
  triggerVariant?: LinkButtonProps['variant'];
  links: LinkItem[];
}

interface LinkCardProps {
  title?: string;
  links?: LinkItem[];
  accordionGroups?: AccordionGroup[];
  defaultButtonVariant?: LinkButtonProps['variant'];
  className?: string;
  children?: ReactNode;
}

const LinkCard: FC<LinkCardProps> = ({ title, links, accordionGroups, defaultButtonVariant = 'default', className, children }) => {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const filteredLinks = links
    ? (q ? links.filter(l => l.text.toLowerCase().includes(q)) : links)
    : [];

  const filteredGroups = accordionGroups
    ? accordionGroups
        .map(group => ({
          ...group,
          links: q ? group.links.filter(l => l.text.toLowerCase().includes(q)) : group.links,
        }))
        .filter(group => !q || group.links.length > 0)
    : [];

  const hasDirectLinks = filteredLinks.length > 0;
  const hasAccordionGroups = filteredGroups.length > 0;
  const hasAnything = children || hasDirectLinks || hasAccordionGroups;

  const openGroups = q
    ? filteredGroups.map(group => `item-${accordionGroups!.findIndex(g => g.triggerText === group.triggerText)}`)
    : undefined;

  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card flex flex-col", className)}>
      {title && (
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("flex-grow", (!title && hasAnything) && "pt-6")}>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar enlace..."
            className="pl-9 pr-9 h-9 text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {children}

        {hasDirectLinks && (
          <div className="flex flex-col gap-3">
            {filteredLinks.map((link, index) => {
              const Icon = link.icon ? iconMap[link.icon] : undefined;
              return (
                <LinkButton
                  key={`direct-${index}`}
                  href={link.href}
                  variant={link.variant || defaultButtonVariant}
                  icon={Icon}
                >
                  {link.text}
                </LinkButton>
              );
            })}
          </div>
        )}

        {hasAccordionGroups && (
          <Accordion
            type="multiple"
            value={openGroups}
            className={cn("w-full", hasDirectLinks && "mt-4")}
          >
            {filteredGroups.map((group, groupIndex) => {
              const originalIndex = accordionGroups!.findIndex(g => g.triggerText === group.triggerText);
              const TriggerIcon = group.triggerIcon ? iconMap[group.triggerIcon] : undefined;
              return (
                <AccordionItem value={`item-${originalIndex}`} key={`accordion-${groupIndex}`}>
                  <AccordionTrigger className="font-semibold hover:no-underline px-3 py-2.5 text-sm rounded-md hover:bg-accent/5 data-[state=open]:bg-accent/10">
                    <div className="flex items-center w-full text-left">
                      {TriggerIcon && <TriggerIcon className="mr-2 h-5 w-5 flex-shrink-0 text-muted-foreground" />}
                      <span className="flex-grow">{group.triggerText}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 pt-3 pl-2 pr-1">
                      {group.links.map((link, linkIndex) => {
                        const Icon = link.icon ? iconMap[link.icon] : undefined;
                        return (
                          <LinkButton
                            key={`accordion-link-${linkIndex}`}
                            href={link.href}
                            variant={link.variant || defaultButtonVariant}
                            icon={Icon}
                          >
                            {link.text}
                          </LinkButton>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}

        {q && !hasDirectLinks && !hasAccordionGroups && (
          <p className="text-sm text-muted-foreground text-center py-4">Sin resultados para "{query}"</p>
        )}
      </CardContent>
    </Card>
  );
};

export default LinkCard;
