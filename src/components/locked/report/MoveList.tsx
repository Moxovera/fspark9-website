import type { MoveBlockData } from "@/types/content";
import { Note } from "./Note";

export function MoveList({ block, noteLabel }: { block: MoveBlockData; noteLabel: string }) {
  return (
    <div className="move-block">
      <h3>
        <small>{block.letter}</small>
        {block.title}
      </h3>
      <p className="intro">{block.intro}</p>
      {block.moves.map((mv) => (
        <div key={mv.no} className="move">
          <div className="no">{mv.no}</div>
          <div>
            <h4>{mv.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: mv.body }} />
            {mv.note && <Note html={mv.note} label={noteLabel} />}
          </div>
        </div>
      ))}
    </div>
  );
}
