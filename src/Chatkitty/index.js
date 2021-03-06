import ChatKitty from 'chatkitty';
export const kitty = ChatKitty.getInstance('8ae40fc3-2c1e-41f6-967c-743db673fb43')

export function getChannelDisplayName(channel){
    if(channel.type === 'DIRECT'){
        return channel.members.map((member) => member.displayName).join(', ');
        
    } else {
        return channel.name;
    }
}