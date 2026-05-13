import { cn } from "@/src/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps extends CardProps {}
interface CardBodyProps extends CardProps {}
interface CardFooterProps extends CardProps {}
interface CardTitleProps extends CardProps {}
interface CardDescriptionProps extends CardProps {}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("p-5 border-b border-white/[0.05]", className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div className={cn("p-5", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("p-5 border-t border-white/[0.05]", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold text-white", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-[#9aa3bb]", className)}>
      {children}
    </p>
  );
}
