/*
DROPZONE CITATION
Title: Create a drag-and-drop component with react-dropzone
Author: Uzochukwu Eddie Odozi
Date: June 4, 2020
Availability: https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/
*/

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import './dropzone.css';

const Dropzone = (props) => {
	const fileInputRef = useRef();
	const modalImageRef = useRef();
	const modalRef = useRef();
	const progressRef = useRef();
	const uploadRef = useRef();
	const uploadModalRef = useRef();
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [validFiles, setValidFiles] = useState([]);
	const [unsupportedFiles, setUnsupportedFiles] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		let filteredArr = selectedFiles.reduce((acc, current) => {
			const x = acc.find((item) => item.name === current.name);
			if (!x) {
				return acc.concat([current]);
			} else {
				return acc;
			}
		}, []);
		setValidFiles([...filteredArr]);
	}, [selectedFiles]);

	const preventDefault = (e) => {
		e.preventDefault();
		// e.stopPropagation();
	};

	const dragOver = (e) => {
		preventDefault(e);
	};

	const dragEnter = (e) => {
		preventDefault(e);
	};

	const dragLeave = (e) => {
		preventDefault(e);
	};

	const fileDrop = (e) => {
		preventDefault(e);
		const files = e.dataTransfer.files;
		if (files.length) {
			handleFiles(files);
		}
	};

	const filesSelected = () => {
		if (fileInputRef.current.files.length) {
			handleFiles(fileInputRef.current.files);
		}
	};

	const fileInputClicked = () => {
		fileInputRef.current.click();
	};

	const handleFiles = (files) => {
		for (let i = 0; i < files.length; i++) {
			if (validateFile(files[i])) {
				setSelectedFiles((prevArray) => [...prevArray, files[i]]);
			} else {
				files[i]['invalid'] = true;
				setSelectedFiles((prevArray) => [...prevArray, files[i]]);
				setErrorMessage('File type not permitted');
				setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
			}
		}
	};

	const validateFile = (file) => {
		const validTypes = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'image/gif',
			'image/x-icon',
		];
		if (validTypes.indexOf(file.type) === -1) {
			return false;
		}

		return true;
	};

	const fileSize = (size) => {
		if (size === 0) {
			return '0 Bytes';
		}
		const k = 8192;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(size) / Math.log(k));
		return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};

	const fileType = (fileName) => {
		return (
			fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) ||
			fileName
		);
	};

	const removeFile = (name) => {
		const index = validFiles.findIndex((e) => e.name === name);
		const index2 = selectedFiles.findIndex((e) => e.name === name);
		const index3 = unsupportedFiles.findIndex((e) => e.name === name);
		validFiles.splice(index, 1);
		selectedFiles.splice(index2, 1);
		setValidFiles([...validFiles]);
		setSelectedFiles([...selectedFiles]);
		if (index3 !== -1) {
			unsupportedFiles.splice(index3, 1);
			setUnsupportedFiles([...unsupportedFiles]);
		}
	};

	const openImageModal = (file) => {
		const reader = new FileReader();
		modalRef.current.style.display = 'block';
		reader.readAsDataURL(file);
		reader.onload = function (e) {
			modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
		};
	};

	const closeModal = () => {
		modalRef.current.style.display = 'none';
		modalImageRef.current.style.backgroundImage = 'none';
	};

	// set the form data, which includes only three properties: key, acl, and file
	const uploadFiles = async (e) => {
		e.preventDefault();
		uploadModalRef.current.style.display = 'block';
		uploadRef.current.innerHTML = 'File(s) Uploading...';
		for (let i = 0; i < validFiles.length; i++) {
			const formData = new FormData();
			props.setImgUrl(
				`https://jspect.s3.amazonaws.com/artwork-hi-res/${validFiles[i].name}`
			);
			formData.append('key', `artwork-hi-res/${validFiles[i].name}`);
			formData.append('acl', 'bucket-owner-full-control');
			formData.append('file', validFiles[i]);
			axios
				.post('https://jspect.s3.amazonaws.com/', formData, {
					onUploadProgress: (progressEvent) => {
						const uploadPercentage = Math.floor(
							(progressEvent.loaded / progressEvent.total) * 100
						);
						progressRef.current.innerHTML = `${uploadPercentage}%`;
						progressRef.current.style.width = `${uploadPercentage}%`;

						if (uploadPercentage === 100) {
							uploadRef.current.innerHTML =
								'File Uploaded! Please click outside this window to exit.';
							validFiles.length = 0;
							setValidFiles([...validFiles]);
							setSelectedFiles([...validFiles]);
							setUnsupportedFiles([...validFiles]);
						}
					},
				})
				.then(() => {
					setSubmitted(true);
				})
				.catch(() => {
					uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
					progressRef.current.style.backgroundColor = 'red';
				});
		}
	};

	const closeUploadModal = () => {
		uploadModalRef.current.style.display = 'none';
	};

	return (
		<>
			<div className='container'>
				{unsupportedFiles.length === 0 && validFiles.length ? (
					<button className='file-upload-btn' onClick={(e) => uploadFiles(e)}>
						Upload Files
					</button>
				) : null}
				{unsupportedFiles.length ? (
					<p>Please remove all unsupported files.</p>
				) : null}
				<div
					className='drop-container'
					onDragOver={dragOver}
					onDragEnter={dragEnter}
					onDragLeave={dragLeave}
					onDrop={fileDrop}
					onClick={fileInputClicked}>
					<div className='drop-message'>
						<div className='upload-icon'></div>
						Drag & Drop file here or click to select file
					</div>
					<input
						ref={fileInputRef}
						className='file-input'
						type='file'
						multiple
						onChange={filesSelected}
					/>
				</div>
				<div className='file-display-container'>
					{submitted && (
						<span className='success-message'>
							Image Submitted Successfully!
						</span>
					)}
					{validFiles.map((data, i) => (
						<div className='file-status-bar' key={i}>
							<div
								onClick={
									!data.invalid
										? () => openImageModal(data)
										: () => removeFile(data.name)
								}>
								<div className='file-type-logo'></div>
								<div className='file-type'>{fileType(data.name)}</div>
								<span
									className={`file-name ${data.invalid ? 'file-error' : ''}`}>
									{data.name}
								</span>
								<span className='file-size'>({fileSize(data.size)})</span>{' '}
								{data.invalid && (
									<span className='file-error-message'>({errorMessage})</span>
								)}
							</div>
							<div
								className='file-remove'
								onClick={() => removeFile(data.name)}>
								X
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='modal' ref={modalRef}>
				<div className='overlay' onClick={() => closeModal()}></div>
				<div
					className='modal-image'
					ref={modalImageRef}
					onClick={() => closeModal()}>
					{' '}
				</div>
			</div>

			<div className='upload-modal' ref={uploadModalRef}>
				<div className='overlay' onClick={() => closeUploadModal()}></div>
				<div className='progress-container'>
					<span ref={uploadRef}></span>
					<div className='progress'>
						<div className='progress-bar' ref={progressRef}></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dropzone;
