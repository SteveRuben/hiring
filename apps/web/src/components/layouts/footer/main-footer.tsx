'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { useTranslation } from '@/components/i18n';

const FOOTER_DETAILS = [
  {
    title: 'Produit',
    details: [
      { label: 'Fonctionnalités', link: '#' },
      { label: 'Tarifs', link: '#' },
      { label: 'Témoignages', link: '#' },
      { label: 'FAQ', link: '#' },
    ],
  },
  {
    title: 'Entreprise',
    details: [
      { label: 'À propos', link: '#' },
      { label: 'Blog', link: '#' },
      { label: 'Carrières', link: '#' },
      { label: 'Contact', link: '#' },
    ],
  },
  {
    title: 'Légal',
    details: [
      { label: 'Confidentialité', link: '#' },
      { label: 'Conditions', link: '#' },
      { label: 'Cookies', link: '#' },
    ],
  },
];
const SOCIAL_NETWORS_ICON = [
  {
    icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    label: 'Facebook',
    link: '#',
  },
  {
    icon: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.4 3 5c2.2 1.6 4.6 2.5 7 2.6-1-1.6-1-3.3 0-5C12 .5 16 0 17 2c.9 0 1.8-.3 2.6-.7C19.1 3.1 18 4 17 4h5z',
    label: 'Twitter',
    link: '#',
  },
  {
    icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z',
    label: 'LinkedIn',
    link: '#',
  },
];

const MainFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-6 py-12 px-4 md:px-6 md:flex-row md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 md:w-1/3"
        >
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">UseHiring</span>
          </Link>
          <p className="text-sm text-muted-foreground">{t('footer.description')}</p>
          <div className="flex gap-4">
            {SOCIAL_NETWORS_ICON.map((social, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href={social.link} className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d={social.icon}></path>
                  </svg>
                  <span className="sr-only">{social.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:flex-1">
          {FOOTER_DETAILS.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: columnIndex * 0.1 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-medium">{t(column.title)}</h3>
              <ul className="space-y-2">
                {column.details.map((item, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href={item.link}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {t(item.label)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-muted-foreground"
          >
            &copy; {new Date().getFullYear()} UseHiring.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs text-muted-foreground"
          >
            {t('footer.withPassion')}
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
