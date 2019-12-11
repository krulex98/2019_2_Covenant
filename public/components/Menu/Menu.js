import BaseComponent from '../BaseComponent/BaseComponent';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import template from './Menu.pug';
import Link from '../Link/Link';
import Urls from '../../services/Urls';
import {UserRole} from '../../models/UserModel';

class Menu extends BaseComponent {
	constructor() {
		const initialState = {
			defaultMenuItems: [],
			userMenuItems: [],
			adminMenuItems: []
		};
		super(template, initialState);
		this.state = initialState;
		this.updateUser = this.updateUser.bind(this);
		EventBus.subscribe(Events.UpdateUser, this.updateUser);

		this.renderDefaultMenuItems();
	}

	getDefaultMenuItems() {
		return [
			{title: 'Home', imgPath: 'img/home.png', id: 'menu-home-link', route: Urls.MainUrl},
			{title: 'Collections', imgPath: 'img/playlist.png', id: 'menu-collections-link', route: Urls.CollectionsUrl},
			{title: 'Albums', imgPath: 'img/music-folder.png', id: 'menu-albums-link', route: Urls.ALbumsUrl},
			{title: 'Artists', imgPath: 'img/micro.png', id: 'menu-artists-link', route: Urls.ArtistsUrl},
			{title: 'Search', imgPath: 'img/search-gray.png', id: 'menu-search-link', route: Urls.SearchUrl}
		];
	}

	getUserMenuItems() {
		return [
			{title: 'Favourite', imgPath: 'img/fav.png', id: 'menu-fav-link', route: Urls.FavouritesUrl},
			{title: 'Playlists', imgPath: 'img/playlists.png', id: 'menu-playlists-link', route: Urls.PlaylistsUrl},
			{title: 'Followers', imgPath: 'img/friends.png', id: 'menu-followers-link', route: Urls.Followers},
			{title: 'Following', imgPath: 'img/friends.png', id: 'menu-following-link', route: Urls.Following}
			// {title: 'Feed', imgPath: 'img/feed.png', id: 'menu-feed-link'},
		];
	}

	getAdminMenuItems() {
		return [
			{title: 'Collections', imgPath: 'img/playlist.png', id: 'admin-collections-link', route: Urls.AdminCollections},
			{title: 'Artists', imgPath: 'img/micro.png', id: 'admin-artists-link', route: Urls.AdminArtists},
			{title: 'Albums', imgPath: 'img/music-folder.png', id: 'admin-albums-link', route: Urls.AdminAlbums},
			{title: 'Tracks', imgPath: 'img/musical-note.png', id: 'admin-tracks-link', route: Urls.AdminTracks}
		];
	}

	updateUser(user) {
		this.renderUserMenuItems();
		if (user.role === UserRole.Admin) {
			this.renderAdminMenuItems();
		}
	}

	renderDefaultMenuItems() {
		this.state.defaultMenuItems = this.getDefaultMenuItems();
		this.update(this.state);
	}

	renderUserMenuItems() {
        this.state.userMenuItems = this.getUserMenuItems();
        this.update(this.state);
	}

	renderAdminMenuItems() {
		this.state.adminMenuItems = this.getAdminMenuItems();
		this.update(this.state);
	}

	onRender() {
		let items = [];
		items.push(...this.state.defaultMenuItems);
		items.push(...this.state.userMenuItems);
		items.push(...this.state.adminMenuItems);

		items.forEach(item => {
			new Link({elementId: item.id, eventType: 'click', route: item.route});
		});
    }
}

export default Menu;