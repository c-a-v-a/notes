import React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

class AddNote extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			note: '',
			keys: []
		};

		this.setTitle.bind(this)
		this.setNote.bind(this)
	}

	setTitle(text) {
		this.setState(() => {
			return {
				title: text
			}
		});
	}

	setNote(text) {
		this.setState(() => {
			return {
				note: text
			}
		});
	}

	async getKeys() {
		let keys = await SecureStore.getItemAsync('keyz');
		keys = keys.split(',')

		let arr = [];

		for (let key of keys) {
			arr.push(parseInt(key));
		}

		arr.sort((a, b) => {
			return a - b
		});

		this.setState(() => {
			return {
				keys: [...arr]
			}
		})
	}

	async saveKeys(value) {
		await SecureStore.setItemAsync('keyz', `${value}`)
	}

	async saveNote(key) {
		await SecureStore.setItemAsync(`N${key}`, `${this.state.note}`)
	}

	async saveTitle(key) {
		await SecureStore.setItemAsync(`T${key}`, `${this.state.title}`);
	}

	async save() {
		let key = parseInt(this.state.keys[this.state.keys.length - 1]) + 1;

		if (!key) key = 0;

		const keys = [...this.state.keys, key.toString()];

		if (key != 0) await this.saveKeys(keys.join(','))
		else await this.saveKeys(key.toString());

		await this.saveNote(key);
		await this.saveTitle(key);
		
		await this.getKeys();
	}

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<TextInput
					underlineColorAndroid='#000'
					placeholder='TITLE'
					onChangeText={ (text) => this.setTitle(text) }
					style={{ padding: 5, margin: 5, width: '90%' }}
				/>

				<TextInput
					underlineColorAndroid='#000'
					placeholder='NOTE'
					onChangeText={ (text) => this.setNote(text) }
					style={{ padding: 5, margin: 5, width: '90%' }}
				/>

				<TouchableOpacity 
					style={{ width: 100, height: 30, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}
					onPress={() => this.save() }
				>
					<Text style={{ color: '#fff' }}>ADD</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default AddNote;
