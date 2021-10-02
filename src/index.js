import React from 'react';
import ReactDOM from 'react-dom';
import RecipesList from './RecipesList';
import 'uikit-react/src/stories/import.scss';
import './index.css';
import { Section } from 'uikit-react';

ReactDOM.render(
    <Section position="relative">
        <RecipesList />
    </Section>,
    document.getElementById('root')
);
