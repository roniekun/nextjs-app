export default function EmailTo() {
  const handleClick = () => {
    const user = {
      email: "roniebenitez01@gmail.com",
      subject: "new project",
    };
    const mailtoUrl = `mailto:${user.email}?subject=${encodeURIComponent(
      user.subject
    )}`;
    window.open(mailtoUrl, "_blank");
  };
  return handleClick;
}
