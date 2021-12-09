import React from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

class Notes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			keys: [],
			titles: {},
			notes: {}
		};

		this.getKeys.bind(this);
		this.removeNote.bind(this);
		this.getKeys();
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

		let t = {};
		let n = {};

		for (let key of this.state.keys) {
			t[key.toString()] = await SecureStore.getItemAsync(`T${key}`)
			n[key.toString()] = await SecureStore.getItemAsync(`N${key}`)
		}

		this.setState(() => {
			return {
				titles: {...t},
				notes: {...n}
			}
		})
	}

	removeNote(item) {
		this.setState((prev) => {
			let arr = prev.keys;
			arr.splice(arr.indexOf(item), 1)

			let newstr = arr.join(',');

			SecureStore.setItemAsync('keyz', newstr);
			SecureStore.deleteItemAsync(`T${item}`)
			SecureStore.deleteItemAsync(`N${item}`)

			return {
				keys: [...arr]
			}
		})
	}


	render() {
		return (
			<View style={{alignItems: 'flex-start'}}>
				<FlatList 
					numColumns='2'
					data={this.state.keys}
					keyExtractor={(item) => item.toString()}
					renderItem={({item}) => 
						(
							<TouchableOpacity 
								onLongPress={() => this.removeNote(item)}
								style={{ width: '40%', height: 90, margin: '5%', backgroundColor: 'blue' }}>
								<Text style={{ fontSize: 20 }}>{ this.state.titles[item] }</Text>
								<Text>{ this.state.notes[item] }</Text>
							</TouchableOpacity>
						)
					}
				/>
			</View>
		);
	}
}

export default Notes;
