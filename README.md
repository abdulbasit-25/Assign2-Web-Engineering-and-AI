# WEB ENGINEERING / FRONTEND DEVELOPMENT

## Assignment 2: Advanced React Component Architecture & State Management

**Submitted By:** Abdul Basit  
**Registration ID:** 249611  
**Course:** Web Engineering / Frontend Development  
**Assignment:** 2  
**Due Date:** 28 October 2026  
**Submitted To:** Mr. Ammar

---

# Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)

### 1. Introduction

Client-Side Rendering (CSR) and Server-Side Rendering (SSR) are two common approaches to rendering web applications. They differ in where the page content is generated, how the initial page is delivered, and how the application becomes interactive. Understanding these differences helps developers choose an appropriate architecture based on performance, search engine optimization (SEO), and hosting requirements.

### 2. Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)

**Client-Side Rendering (CSR):** In CSR, the server sends an HTML file along with JavaScript resources to the browser. The browser downloads and executes the JavaScript, renders React components, and makes the application interactive. This approach is commonly used in single-page applications (SPAs) built with Vite and React. Once loaded, the application can navigate between views without requesting a completely new HTML page for every interaction.

**Server-Side Rendering (SSR):** In SSR, the server executes React rendering logic and generates HTML for the requested page before sending it to the browser. This allows users to see meaningful page content before the client-side JavaScript has fully loaded. React then hydrates the rendered HTML to enable interactivity. Frameworks such as Next.js support SSR alongside other rendering strategies.

### 3. Performance Considerations

CSR can provide smooth navigation after the initial application load, but the first render may take longer on slower devices or networks because JavaScript must be downloaded and executed. SSR can improve the initial display of meaningful content, although server processing may increase response times if the application is not optimized. Effective caching, code splitting, and resource optimization can improve performance with either approach.

### 4. Search Engine Optimization (SEO)

SSR can make page content available to search engines directly in the initial HTML, which is beneficial for public product listings, product descriptions, and category pages. Although modern search engines can render JavaScript-based applications, CSR may require additional processing before all content becomes discoverable. Therefore, SSR can simplify SEO for content-heavy e-commerce websites, but CSR is not inherently unsuitable for SEO.

### 5. Hosting and Practical Applications

CSR applications built with Vite can be deployed as static files on platforms such as Vercel. This makes hosting relatively simple, affordable, and easy to maintain. SSR generally requires server-side execution, which can introduce additional infrastructure requirements and operating costs. However, static generation and caching can reduce these costs.

### 6. Conclusion

For the E-Commerce Inventory and Stock Management Dashboard, CSR is a suitable choice because the application primarily focuses on interactive features, including product management, inventory updates, filtering, and audit logs. These features do not generally require search engine indexing. However, for a large public-facing e-commerce platform, SSR or a hybrid architecture using Next.js may provide advantages in initial content delivery and SEO. Ultimately, the best approach depends on the application's requirements, expected traffic, and performance goals.
