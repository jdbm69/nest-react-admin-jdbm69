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
