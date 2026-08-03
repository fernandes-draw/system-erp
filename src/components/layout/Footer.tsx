import { SYSTEM_NAME } from "../../config/constants";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <span>{SYSTEM_NAME} © 2026 - Developed by Everson Fernandes</span>
      </div>
      <div>
        {/* Espaço reservado para algum link extra, caso queira, ou pode deixar vazio */}
        <a href="#main-content">Voltar ao topo</a>
      </div>
    </footer>
  );
}