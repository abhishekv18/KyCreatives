import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * One action style across the site: Violet primary, outlined ghost.
 * Internal routes use <Link>, external URLs open in a new tab with an
 * up-right arrow so the difference is visible.
 */
export default function Button({ to, href, variant = "primary", size, icon = true, children, className = "", ...rest }) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ""} ${className}`;
  const external = href && /^https?:/.test(href);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {icon && <Icon className="btn__icon" size={18} strokeWidth={1.75} aria-hidden="true" />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
