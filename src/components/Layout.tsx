interface props { children: any }
const Layout = ({ children }: props) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-brand-100'>
      <div className='rounded p-4 w-40 bg-brand-600'>
        {children}
      </div>
      {/* <Socials /> */}
    </div>
  );
};

export default Layout;