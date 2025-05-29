import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LinkButton, { type LinkButtonProps } from '@/components/link-button'; // Corrected import path
import { cn } from "@/lib/utils";

interface LinkItem {
  href: string;
  text: string;
  variant?: LinkButtonProps['variant'];
  icon?: React.ElementType;
}

interface LinkCardProps {
  title?: string;
  links: LinkItem[];
  defaultButtonVariant?: LinkButtonProps['variant'];
  className?: string;
}

const LinkCard: FC<LinkCardProps> = ({ title, links, defaultButtonVariant = 'default', className }) => {
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card", className)}>
      {title && (
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(!title && "pt-6")}>
        <div className="flex flex-col gap-3">
          {links.map((link, index) => (
            <LinkButton
              key={index}
              href={link.href}
              variant={link.variant || defaultButtonVariant}
              icon={link.icon}
            >
              {link.text}
            </LinkButton>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
