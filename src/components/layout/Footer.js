function Footer () {
  const footerYear = new Date().getFullYear()
  return (
    <footer className='footer p-10 bg-gray-700 text-primary footer-center'>
      <div>
        <p>Copyright &copy; {footerYear} all rights reserved</p>
      </div>
    </footer>
  )
}
export default Footer
