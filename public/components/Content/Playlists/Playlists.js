import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './Playlists.pug';
import PlaylistPopup from './PlaylistPopup/PlaylistPopup';
import PlaylistModel from '../../../models/PlaylistModel';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import ConfirmationDialog from '../../../common/Kit/ConfirmationDialog/ConfirmationDialog';
import {formatServerRootForArray} from '../../../services/Utils';
import SharePopup from './SharePopup/SharePopup';

class Playlists extends BaseComponent {
	constructor() {
		const initialState = {
			title: 'Playlists',
			items: []
		};
		super(template, initialState);
		this.loadItems = this.loadItems.bind(this);

		this.state = initialState;
		this.loadItems();

		EventBus.subscribe(Events.UpdatePlaylists, this.loadItems);
	}

	loadItems() {
		PlaylistModel.getPlaylists(20, 0)
		.then(response => {
			this.state.items = response.body.playlists;
			formatServerRootForArray(this.state.items, 'photo');
			this.update(this.state);
		})
		.catch(error => {
			console.log(error);
		});
	}

	onRender() {
		this.addHandlers();
	}

	addHandlers() {
		const createBtn = document.getElementById('create-playlist-btn');
		createBtn.addEventListener('click', this.createPlaylistHandler);

		this.addDeleteHandlers();
		this.addNameHandlers();
		this.addShareHandlers();
	}

	createPlaylistHandler() {
		const popup = new PlaylistPopup();
		popup.render('popup');
	}

	addDeleteHandlers() {
		this.state.items.forEach(item => {
			const deleteBtn = document.getElementById(`delete-playlist-btn-${item.id}`);
			if (!deleteBtn) {return;}
			deleteBtn.addEventListener('click', () => { this.deletePlaylistHandler(item.id)});
		});
	}

	addNameHandlers() {
		this.state.items.forEach(item => {
			const nameBtn = document.getElementById(`playlist-name-${item.id}`);
			if (!nameBtn) {return;}
			nameBtn.addEventListener('click', () => {
				EventBus.publish(Events.ChangeRoute,{newUrl: `/playlist/${item.id}`});
			});
		});
	}

	addShareHandlers() {
		this.state.items.forEach(item => {
			const shareBtn = document.getElementById(`share-playlist-btn-${item.id}`);
			if (!shareBtn) {return;}
			shareBtn.addEventListener('click', () => {
				this.sharePlaylistHandler(item.id);
			});
		});
	}

	deletePlaylist(id) {
		PlaylistModel.deletePlaylist(id)
		.then(response => {
			if (!response.error) {
				this.loadItems();
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	deletePlaylistHandler(id) {
		const dialog = new ConfirmationDialog({
			successCallback: () => {
				this.deletePlaylist(id);
			}
		});
		dialog.render('popup');
	}

	sharePlaylistHandler(playlistId) {
		const sharePopup = new SharePopup({
			playlistId: playlistId
		});
		sharePopup.render('popup');
	}
}

export default Playlists;