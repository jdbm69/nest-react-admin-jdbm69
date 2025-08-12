/**
 * Actualización de la configuración de Tailwind CSS:
 * - Se reemplaza la propiedad obsoleta 'purge' por 'content' según la versión actual.
 * - Se eliminó la configuración de 'darkMode' para simplificar (se puede activar luego si se desea).
 * - Se extienden los colores personalizados usando variables CSS para facilitar la personalización
 *   y mantener consistencia con el tema de la aplicación.
 * - Se mantiene el plugin '@tailwindcss/forms' para estilos mejorados en formularios.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--brand-primary)',
        'brand-hover': 'var(--brand-hover)',
        'brand-header-background': 'var(--brand-header-background)',
        'primary-white': 'var(--primary-white)',
        'white-hover': 'var(--white-hover)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
