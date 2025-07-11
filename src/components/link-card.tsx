import type { FC, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LinkButton, { type LinkButtonProps } from '@/components/link-button';
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LinkItem {
  href: string;
  text: string;
  variant?: LinkButtonProps['variant'];
  icon?: React.ElementType;
}

interface AccordionGroup {
  triggerText: string;
  triggerIcon?: React.ElementType;
  triggerVariant?: LinkButtonProps['variant']; // Aunque no se use directamente para el estilo del trigger, se mantiene por consistencia
  links: LinkItem[];
}

interface LinkCardProps {
  title?: string;
  links?: LinkItem[];
  accordionGroups?: AccordionGroup[];
  defaultButtonVariant?: LinkButtonProps['variant'];
  className?: string;
  children?: ReactNode; // Allow children to be passed
}

const LinkCard: FC<LinkCardProps> = ({ title, links, accordionGroups, defaultButtonVariant = 'default', className, children }) => {
  const hasDirectLinks = links && links.length > 0;
  const hasAccordionGroups = accordionGroups && accordionGroups.length > 0;

  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card flex flex-col", className)}>
      {title && (
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("flex-grow", (!title && (children || hasDirectLinks || hasAccordionGroups)) && "pt-6")}>
        {children}
        {hasDirectLinks && (
          <div className="flex flex-col gap-3">
            {links!.map((link, index) => (
              <LinkButton
                key={`direct-${index}`}
                href={link.href}
                variant={link.variant || defaultButtonVariant}
                icon={link.icon}
              >
                {link.text}
              </LinkButton>
            ))}
          </div>
        )}

        {hasAccordionGroups && (
          <Accordion type="single" collapsible className={cn("w-full", hasDirectLinks && "mt-4")}>
            {accordionGroups!.map((group, groupIndex) => (
              <AccordionItem value={`item-${groupIndex}`} key={`accordion-${groupIndex}`}>
                <AccordionTrigger
                  className={cn(
                    "font-semibold hover:no-underline px-3 py-2.5 text-sm rounded-md hover:bg-accent/5 data-[state=open]:bg-accent/10"
                  )}
                >
                  <div className="flex items-center w-full text-left">
                    {group.triggerIcon && <group.triggerIcon className="mr-2 h-5 w-5 flex-shrink-0 text-muted-foreground" />}
                    <span className="flex-grow">{group.triggerText}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 pt-3 pl-2 pr-1">
                    {group.links.map((link, linkIndex) => (
                      <LinkButton
                        key={`accordion-link-${linkIndex}`}
                        href={link.href}
                        variant={link.variant || defaultButtonVariant}
                        icon={link.icon}
                      >
                        {link.text}
                      </LinkButton>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default LinkCard;
