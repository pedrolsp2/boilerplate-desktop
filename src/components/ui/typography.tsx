import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';

interface TypographyProps {
  asChild?: boolean;
}

export const TypographyH1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h1';

  return (
    <Comp
      ref={ref}
      className={cn(
        'text-xl xl:text-2xl font-bold tracking-tight scroll-m-20 text-foreground',
        className
      )}
      {...props}
    />
  );
});

export const TypographyH2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h2';

  return (
    <Comp
      ref={ref}
      className={cn(
        'pb-2 text-lg xl:text-xl font-semibold tracking-tight border-b scroll-m-20 first:mt-0 text-foreground',
        className
      )}
      {...props}
    />
  );
});

export const TypographyH3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h3';

  return (
    <Comp
      ref={ref}
      className={cn(
        'text-lg xl:text-xl font-semibold tracking-tight scroll-m-20 text-foreground',
        className
      )}
      {...props}
    />
  );
});

export const TypographyH4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h4';

  return (
    <Comp
      ref={ref}
      className={cn(
        'text-md xl:text-lg font-semibold tracking-tight scroll-m-20 text-foreground',
        className
      )}
      {...props}
    />
  );
});

export const TypographyP = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'p';

  return (
    <Comp
      ref={ref}
      className={cn('text-xs xl:text-sm text-foreground', className)}
      {...props}
    />
  );
});

export const TypographyLarge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={ref}
      className={cn(
        'text-md xl:text-lg font-semibold text-foreground',
        className
      )}
      {...props}
    />
  );
});

export const TypographySmall = React.forwardRef<
  HTMLElement,
  React.HtmlHTMLAttributes<HTMLElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'small';

  return (
    <Comp
      ref={ref}
      className={cn(
        'text-xs xl:text-sm font-normal leading-none text-foreground',
        className
      )}
      {...props}
    />
  );
});
export const TypographyXS = React.forwardRef<
  HTMLElement,
  React.HtmlHTMLAttributes<HTMLElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'small';

  return (
    <Comp
      ref={ref}
      className={cn(
        'text-xs font-normal leading-none text-foreground',
        className
      )}
      {...props}
    />
  );
});
export const TypographyMutedXs = React.forwardRef<
  HTMLElement,
  React.HtmlHTMLAttributes<HTMLElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'small';

  return (
    <Comp
      ref={ref}
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  );
});

export const TypographyMuted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'p';

  return (
    <Comp
      ref={ref}
      className={cn('text-xs xl:text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});

export const TypographyLead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & TypographyProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'p';

  return (
    <Comp
      ref={ref}
      className={cn('text-lg xl:text-xl text-muted-foreground', className)}
      {...props}
    />
  );
});
