import store from '../storage';

const Header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/images/dailydose.png" alt="" width="35" height="35" className="d-inline-block align-top" />
            <span className="badge badge-orange mt-2 ml-2">Daily Dose</span>
          </a>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {props.token === null && (
                  <li className="nav-item mr-2 ">
                    <a type="button" className="btn btn-outline-orange" href="/login">
                      Sign in
                    </a>
                  </li>
                )}

                {props.token === null && (
                  <li className="nav-item">
                    <a type="button" className="btn btn-outline-orange" href="/sign-up">
                      Get Started
                    </a>
                  </li>
                )}

                {props.token !== null && (
                  <li className="nav-item">
                    <a type="button" className="btn btn-outline-orange mr-3" href="/me">
                      My blogs
                    </a>
                  </li>
                )}

                {props.token !== null && (
                  <li className="nav-item">
                    <a type="button" className="btn btn-outline-orange mr-3" href="/create-blog">
                      Create New Blog
                    </a>
                  </li>
                )}

                {props.token !== null && (
                  <li className="nav-item">
                    <a type="button" className="btn btn-outline-orange" href="/" onClick={() => store.clear()}>
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="text-center">
        <span className="badge badge-orange">Blogger Site</span>
        <h1>Your Daily Dose of Tech Knowledge</h1>
      </div>
    </header>
  );
};

export default Header;
