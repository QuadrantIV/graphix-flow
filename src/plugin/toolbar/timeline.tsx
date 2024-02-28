import { getContext } from 'graphix-engine';
import { RedoIcon, UndoIcon } from 'src/icon';

const Timeline = () => {
  const undo = () => {
    getContext().getTimeline().back();
  }

  const redo = () => {
    getContext().getTimeline().forward();
  }
  return (
    <div className='toolbar-timeline'>
      <div className="mr-8" onClick={undo}><UndoIcon /></div>
      <div onClick={redo}><RedoIcon /></div>
    </div>
  )
}

export default Timeline;