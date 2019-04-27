import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => (
    <header>
        <nav>
            <Link className="btn btn-default" to='/'>Books</Link>
            <Link className="btn btn-default" to='/admin'>Admin</Link>
        </nav>
    </header>
);
