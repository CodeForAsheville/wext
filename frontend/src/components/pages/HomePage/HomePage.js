import React, { useState } from 'react';
import {
  HomePageStyled,
  HomeContent,
  DnDContent,
  DragErrors,
  DragWarnings
} from './HomePage.styled';

// Children
import DragNDrop from '../../elements/DragNDrop/DragNDrop';
import FilesList from './FilesList/FilesList';

const ALLOWED_MIME_TYPES = ['application/pdf'];
const MAX_FILES = 8;
const MAX_FILE_SIZE = 30_000;

function HomePage(props) {
  const fileInputRef = React.createRef();
  const [dragWarnings, setDragWarnings] = useState();
  const [dragErrors, setDragErrors] = useState();
  const [files, setFiles] = useState(new Set());

  const _mergeFileSets = newFiles => {
    const mergedFiles = new Set(files);
    newFiles.forEach(file => mergedFiles.add(file));
    return mergedFiles;
  };

  const handleDrop = drop => {
    setDragErrors(drop.errors);
    setDragWarnings(drop.warnings);
    if (files.size + drop.files.length > MAX_FILES) {
      setDragErrors(['Maximum file limit exceeded']);
      return;
    }
    // TODO: Reject files with duplicate file.name

    let hasDups = false;
    files.forEach(file => {
      const dup = drop.files.find(newFile => newFile.name === file.name);
      if (dup) {
        setDragErrors([`Cannot upload duplicate file "${dup.name}"`]);
        hasDups = true;
      }
    });
    if (!hasDups) setFiles(_mergeFileSets(drop.files));
  };

  const handleRemoveFile = file => {
    // browser stores a "path" to the last file uploaded on the input.
    // It's necessary to "clear" the inputs value here, but not on drop--
    // the browser just replaces previous files in the case of a drop.
    if (fileInputRef.current) fileInputRef.current.value = '';
    // TODO: It would be great to get this taken care of inside DragNDrop,
    // TODO: but currently DragNDrop has no concept of a FilesList or removing files.
    const copiedSet = new Set(files);
    copiedSet.delete(file);
    setFiles(copiedSet);
  };

  const handleGeneratePetition = () => {
    console.log('pretending to generate petition!');
  };

  return (
    <HomePageStyled>
      <HomeContent>
        {files && files.size > 0 && (
          <FilesList
            files={files}
            handleRemoveFile={handleRemoveFile}
            handleGeneratePetition={handleGeneratePetition}
          />
        )}
        <DragNDrop
          ref={fileInputRef}
          mimeTypes={ALLOWED_MIME_TYPES}
          maxFiles={MAX_FILES}
          maxSize={MAX_FILE_SIZE}
          onDrop={handleDrop}
        >
          <DnDContent>
            <div>
              <h2>Upload CIPRS Records</h2>
              <p>up to {MAX_FILES} records</p>
            </div>
            <div>
              {dragWarnings && (
                <DragWarnings>
                  {dragWarnings.map(warning => (
                    <p key={warning}>{warning}</p>
                  ))}
                </DragWarnings>
              )}
              {dragErrors && (
                <DragErrors>
                  {dragErrors.map(error => (
                    <p key={error}>{error}</p>
                  ))}
                </DragErrors>
              )}
            </div>
          </DnDContent>
        </DragNDrop>
      </HomeContent>
    </HomePageStyled>
  );
}

export default HomePage;
