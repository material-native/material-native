'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {colors, withMaterialStyles, Avatar, Icon} from '../material-native';

class Avatars extends PureComponent {
	static navigationOptions = {
		title: 'Avatars',
	};

	state = {
		images: [
			false,
			false,
			false,
			false,
			false,
			false
		],
	};

	componentWillMount() {
		fetch('https://randomuser.me/api/?results=6&inc=picture')
			.then((res) => res.json())
			.then((data) => {
				this.setState({images: data.results.map(({picture}) => picture.large)});
			});
	}

	render() {
		const {materialStyles} = this.props;
		const {images} = this.state;

		return (
			<ScrollView style={materialStyles.root} contentContainerStyle={styles.container}>
				<View style={styles.row}>
					<Avatar
						text='A' />
					<Avatar
						text='B'
						color={colors.blue500} />
					<Avatar
						text='C'
						color={colors.cyan500} />
					<Avatar
						text='D'
						color={colors.orange500} />
					<Avatar
						text='E'
						color={colors.green500} />
					<Avatar
						text='F'
						color={colors.blueGrey500} />
				</View>
				<View style={styles.row}>
					<Avatar
						text='G'
						color={colors.purple500} />
					<Avatar
						icon={<Icon name='check' />}
						color={colors.green800} />
					<Avatar
						icon={<Icon name='person' />}
						color={colors.blue500} />
					<Avatar
						icon={<Icon name='person-outline' />}
						color={colors.blue500} />
					<Avatar
						icon={<Icon name='close' />}
						color={colors.red500} />
					<Avatar
						icon={<Icon name='mood' />}
						color={colors.indigo500} />
				</View>
				<View style={styles.row}>
					{images.map((image, i) => (
						<Avatar
							key={i}
							image={image && <Image source={{uri: image}} />}
							text={String.fromCharCode(65+i)}
							color={colors.grey700} />
					))}
				</View>
				<View style={styles.row}>
					<Avatar
						size={20}
						text='A'
						color={colors.blue500} />
					<Avatar
						size={24}
						text='B'
						color={colors.blue500} />
					<Avatar
						size={32}
						text='C'
						color={colors.blue500} />
					<Avatar
						size={40}
						text='C'
						color={colors.blue500} />
				</View>
				<View style={styles.row}>
					<Avatar
						size={60}
						text='H'
						color={colors.blue500} />
					<Avatar
						size={72}
						text='H'
						color={colors.blue500} />
					<Avatar
						size={80}
						text='H'
						color={colors.blue500} />
					<Avatar
						size={92}
						text='H'
						color={colors.blue500} />
				</View>
			</ScrollView>
		);
	}
}

export default withMaterialStyles((materialTheme) => ({
	root: {
		flex: 1,
		backgroundColor: materialTheme.palette.container,
	},
}))(Avatars);

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 8,
	},
});
