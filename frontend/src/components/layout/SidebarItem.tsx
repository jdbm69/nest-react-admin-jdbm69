/**
 * SidebarItem component
 *
 * Representa un enlace individual dentro del menú lateral (sidebar).
 * Recibe:
 * - children: contenido a mostrar (normalmente íconos y texto).
 * - to: ruta a la que debe navegar el enlace.
 * - active (opcional): indica si el ítem está activo para mostrar un indicador visual (chevron).
 *
 * Se ha modificado el estilo:
 * - Se usa una clase CSS 'link-nav' para estilos globales reutilizables.
 * - El contenido se organiza en un contenedor flex horizontal con espacio entre ícono y texto.
 *
 * Esto mejora la consistencia visual y facilita la personalización de estilos.
 */

import { ReactNode } from 'react';
import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  children: ReactNode;
  to: string;
  active?: boolean;
}

export default function SidebarItem({
  children,
  to,
  active = false,
}: SidebarItemProps) {
  return (
    <Link to={to} className="link-nav">
      <span
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        {children} {active ? <ChevronRight /> : null}
      </span>
    </Link>
  );
}
