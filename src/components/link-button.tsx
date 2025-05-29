import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Button, type ButtonProps } from '@/components/ui/button';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react'; // Renamed to avoid conflict
import { cn } from "@/lib/utils";

export interface LinkButtonProps extends ButtonProps {
  href: string;
  children: ReactNode;
  target?: string;
  icon?: React.ElementType; // Icon component
}

const LinkButton: FC<LinkButtonProps> = ({
  href,
  children,
  variant = 'default',
  target = '_blank',
  icon: IconComponent, // Renamed to avoid conflict with possible prop name
  className,
  ...props
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('//');

  return (
    <Button asChild variant={variant} className={cn("justify-start text-left h-auto py-3", className)} {...props}>
      <Link href={href} target={target} rel={isExternal ? 'noopener noreferrer' : undefined} className="w-full flex items-center">
        {IconComponent && <IconComponent className="mr-2 h-4 w-4 flex-shrink-0" />}
        <span className="flex-grow">{children}</span>
        {isExternal && <ExternalLinkIcon className="ml-2 h-4 w-4 opacity-70 flex-shrink-0" />}
      </Link>
    </Button>
  );
};

export default LinkButton;
