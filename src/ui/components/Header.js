import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => (
    <header>
        <nav>
            <Link className="btn btn-default links" to='/'>Книги</Link>
            <Link className="btn btn-default links" to='/cart'>Корзина</Link>
            <Link className="btn btn-default links" to='/info'>Контакты</Link>
            <Link className="btn btn-default links" to='/admin'>Панель администратора</Link>
            <hr/>
        </nav>
    </header>
);
