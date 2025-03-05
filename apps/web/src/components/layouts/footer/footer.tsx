import { Facebook, Instagram, Mail, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

import { ContactForm } from './contact';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">À propos</h3>
            <p className="text-sm">
              Notre entreprise s'engage à fournir des services de qualité et une expérience client
              exceptionnelle.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gray-900">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ContactForm />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Votre Entreprise. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
