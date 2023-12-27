import { Link } from 'react-router-dom';
import { ArrowRight } from "@phosphor-icons/react"
import './style.css';

export const Section = ({ children }) => {
    return (
        <section className="main-section">
            {children}
        </section>
    )
}

export const SectionHeader = ({ title, link }) => {
    return link ? (
        <div className="section-header with-link">
            <h2>{title}</h2>
            <Link to={link.url} className='btn flex'>
                {link.title}
                <ArrowRight className='icon' />
            </Link>
        </div>
    ) : (
        <div className="section-header">
            <h2>{title}</h2>
        </div>
    )
}