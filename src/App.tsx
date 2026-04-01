import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LanguageProvider } from "@/lib/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import Home from "@/pages/Home"
import Login from "@/pages/admin/Login"
import Dashboard from "@/pages/admin/Dashboard"
import Analytics from "@/pages/admin/Analytics"
import Customers from "@/pages/admin/Customers"
import Orders from "@/pages/admin/Orders"
import Products from "@/pages/admin/Products"
import Categories from "@/pages/admin/Categories"
import Settings from "@/pages/admin/Settings"
import AdminLayout from "@/pages/admin/AdminLayout"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sparkit-theme" attribute="class">
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="customers" element={<Customers />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

