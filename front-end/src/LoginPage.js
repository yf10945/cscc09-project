import "./styles.css";

export default function LoginPage() {
  return (
    <div className="Login">
      <img
        src="http://cdn.onlinewebfonts.com/svg/img_496903.png"
        alt="logo"
        className="icon"
      />
      <form class="complex_form">
        <input
          type="text"
          name="username"
          class="form_element"
          placeholder="Enter a username"
          required
        />
        <input
          type="password"
          name="password"
          class="form_element"
          placeholder="Enter a password"
          required
        />
        <div>
          <button id="signin" name="action" class="btn">
            Sign in
          </button>
          <button id="signup" name="action" class="btn">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
