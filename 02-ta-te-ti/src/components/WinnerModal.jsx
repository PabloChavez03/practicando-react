import Square from "./Square";

function WinnerModal({ winner, resetGame }) {
  if (winner === null) return;
  const winnerText = winner === false ? "Empate" : "Ganó:";

  return (
    <section className="winner">
      <div className="winner-div">
        <h2>{winnerText}</h2>
        <header>{winner && <Square>{winner}</Square>}</header>
      </div>
      <footer className="winner-footer">
        <button onClick={resetGame}>Empezar de nuevo</button>
      </footer>
    </section>
  );
}

export default WinnerModal;
