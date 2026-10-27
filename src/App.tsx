/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import { AboutPage } from './pages/AboutPages';
import { ArticlePage, ArticlesPage, ContentHubPage, WorkshopPage } from './pages/ContentPages';
import { FaqPage } from './pages/FaqPage';
import HomePage from './pages/HomePage';
import NotFoundPage, { ContactPage, PrivacyPage } from './pages/MiscPages';
import { ProjectPage, ProjectsPage } from './pages/ProjectPages';
import { SolutionPage, SolutionsPage } from './pages/SolutionPages';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projetos" element={<ProjectsPage />} />
        <Route path="projetos/:slug" element={<ProjectPage />} />
        <Route path="solucoes" element={<SolutionsPage />} />
        <Route path="solucoes/:slug" element={<SolutionPage />} />
        <Route path="a-duall" element={<AboutPage />} />
        <Route path="conteudo" element={<ContentHubPage />} />
        <Route path="conteudo/artigos" element={<ArticlesPage />} />
        <Route path="conteudo/artigos/:slug" element={<ArticlePage />} />
        <Route path="conteudo/workshop-tecnico" element={<WorkshopPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contato" element={<ContactPage />} />
        <Route path="politica-de-privacidade" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
