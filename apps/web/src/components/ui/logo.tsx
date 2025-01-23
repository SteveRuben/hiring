import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  link?: boolean
  newTab?: boolean
}

export function Logo({ className, link = false, newTab = false, ...props }: LogoProps) {
  const logoContent = (
    <div className={cn("relative", className)} {...props}>
      <Image
        src="/assets/logo.svg"
        alt="Logo"
        width={120}
        height={40}
        className="h-auto w-auto object-contain"
        priority
      />
    </div>
  )

  if (link) {
    return (
      <Link 
        href="/" 
        {...(newTab ? {
          target: "_blank",
          rel: "noopener noreferrer"
        } : {})}
        className="hover:opacity-90 transition-opacity"
      >
        {logoContent}
      </Link>
    )
  }

  return logoContent
}

// Usage du composant :
// <Logo /> - Logo simple
// <Logo link /> - Logo avec lien vers la page d'accueil
// <Logo link newTab /> - Logo avec lien qui s'ouvre dans un nouvel onglet
// <Logo className="w-32" /> - Logo avec taille personnalisée