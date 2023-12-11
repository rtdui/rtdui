import { NavLink } from "@remix-run/react";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";

interface NavMenuProps {
  data?: { group: string; items: { label: string; url: string }[] }[];
  onClick?: () => void;
  className?: string;
}
export default function NavMenu(props: NavMenuProps) {
  const { data = [], onClick, className } = props;
  const { t } = useTranslation();
  return (
    <ul className={clsx("menu", className)}>
      {data.map((d) => (
        <React.Fragment key={d.group}>
          <li className="menu-title">{t(`navMenu.group.${d.group}`)}</li>
          {d.items.map((dd) => (
            <li key={`${d.group}-${dd.label}`}>
              <NavLink to={dd.url} onClick={onClick}>
                {t(`navMenu.${dd.label}`)}
              </NavLink>
            </li>
          ))}
        </React.Fragment>
      ))}
    </ul>
  );
}
