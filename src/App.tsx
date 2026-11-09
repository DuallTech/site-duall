/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigate, Route, Routes } from 'react-router-dom';

import AdminEditor from './admin/AdminEditor';
import AdminLayout from './admin/AdminLayout';
import AdminPosts from './admin/AdminPosts';
import Layout from './components/Layout';
import { AboutPage } from './pages/AboutPages';
import { ArticlePage, ArticlesPage } from './pages/ContentPages';
import { FaqPage } from './pages/FaqPage';
import HomePage from './pages/HomePage';
import NotFoundPage, { ContactPage, PrivacyPage } from './pages/MiscPages';
import { ProjectPage, ProjectsPage } from './pages/ProjectPages';
import { SolutionPage, SolutionsPage } from './pages/SolutionPages';

export default function App() {
  return (
    <Routes>
      {/* Painel de artigos: fora do Layout do site, com login, sem pré-render e fora do sitemap */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminPosts />} />
        <Route path="novo" element={<AdminEditor />} />
        <Route path="editar/:id" element={<AdminEditor />} />
      </Route>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projetos" element={<ProjectsPage />} />
        <Route path="projetos/:slug" element={<ProjectPage />} />
        <Route path="solucoes" element={<SolutionsPage />} />
        <Route path="solucoes/:slug" element={<SolutionPage />} />
        <Route path="a-duall" element={<AboutPage />} />
        <Route path="conteudo" element={<Navigate to="/conteudo/artigos" replace />} />
        <Route path="conteudo/artigos" element={<ArticlesPage />} />
        <Route path="conteudo/artigos/:slug" element={<ArticlePage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contato" element={<ContactPage />} />
        <Route path="politica-de-privacidade" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
