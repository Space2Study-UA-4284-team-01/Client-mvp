export const guestRoutes = {
  home: { route: '/', path: '/' },
  welcome: { route: 'welcome', path: '/#welcome' },
  student: { route: 'student', path: 'student' },
  tutor: { route: 'tutor', path: 'tutor' },
  admin: { route: 'admin', path: 'admin' },
  error: { route: 'error', path: 'error' },
  about: { route: 'about', path: 'about' },
  privacyPolicy: { route: 'privacy-policy', path: 'privacy-policy' },
  termOfUse: { route: '#', path: '#' },
  test: {
    photoStep: { route: 'test/photo-step', path: 'test/photo-step' }
  },
  navBar: {
    whatCanYouDo: { route: 'what-can-you-do', path: '/#what-can-you-do' },
    howItWorks: { route: 'how-it-works', path: '/#how-it-works' },
    whoWeAre: { route: 'who-we-are', path: '/#who-we-are' }
  }
}
