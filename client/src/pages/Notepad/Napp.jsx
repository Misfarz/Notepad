import React, { useState ,useEffect} from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Pad from './Pad'

const STORAGE_KEY = "notes"; // ← YOU MISSED THIS


function Napp() {

  const [open, setOpen] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [notes, setNotes] = useState({});
  const [currentId, setCurrentId] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

// load from local storage
  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (saved) {
    const { current, ...rest } = saved; // 👈 CRITICAL
    setNotes(rest);
    setCurrentId(current ?? null);
  }

  setHasLoaded(true);
}, []);



  useEffect(() => {
  if (!hasLoaded) return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...notes, current: currentId })
  );
}, [notes, currentId, hasLoaded]);


  // creating a new note when mounting phase when no notes exists

  useEffect(() => {
    if (hasLoaded && Object.keys(notes).length === 0) {
    createNote();
  }
}, [hasLoaded,notes]);


  function createNote(initial = {}) {

    const id = `note-${Date.now()}`;
    const newNote = {
      t1: initial.t1 ?? "Untitled note",
      t2: initial.t2 ?? "",
      t3: new Date().toISOString(),
    };

    setNotes((prev) => ({
      ...prev,
      [id]: newNote,
    }));
    setCurrentId(id);
  }

  function updateNote(id, data) {
    setNotes((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...data },
    }));
  }

  function deleteNote(id) {
  setNotes(prev => {
    const copy = { ...prev };
    delete copy[id];
    return copy;
  });

  setCurrentId(prevId => {
    if (prevId !== id) return prevId;

    const remainingIds = Object.keys(notes).filter(nid => nid !== id);
    return remainingIds.length ? remainingIds[0] : null;
  });
}

  function deleteAllNotes() {
    setNotes({});
    setCurrentId(null);
  }



  return (

    <>
      <Header
        onMenuClick={() => setOpen((p) => !p)}
        isFullScreen={isFullScreen}
      />

      <Sidebar
        open={open}
        isFullScreen={isFullScreen}
        notes={notes}
        currentId={currentId}
        onCreate={createNote}
        onSelect={setCurrentId}
        onClearAll={deleteAllNotes}
      />

      <Pad
        open={open}
        isFullScreen={isFullScreen}
        toggleFullScreen={() => setIsFullScreen((p) => !p)}
        note={notes[currentId]}
        onChange={(data) => updateNote(currentId, data)}
        onDelete={() => deleteNote(currentId)}
        onCreate={createNote}
      


      />
    </>
  )
}

export default Napp