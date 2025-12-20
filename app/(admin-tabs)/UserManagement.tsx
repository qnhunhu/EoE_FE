import useAccounts from '@/hooks/useAccounts';
import { Account } from '@/types/Account';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Role } from '../../types/Account';

// const userDatas = Array(50).fill({
//     id: 'asdfexcv12ds',
//     fullName: 'Nguyen Khoa Quan',
//     numbers: '0xx.xxx.xxx',
//     email: 'khoaquan@gmail.com',
//     position: 'Distributor',
//     address: 'HoChiMinh City',
//     dateCreate: '05/05/2025',
//     note: 'Note',
// });

const columns = [
    '#', 'ID', 'Full name', 'Numbers', 'Email', 'Position', 'Address'
];

const UserManagement = () => {
    const router = useRouter();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [newUser, setNewUser] = useState<Account>({
        userId: 0,
        name: '',
        phone: '',
        email: '',
        role: 'Buyer',
        address: '',
        orders: [],
        complaints: [],
        ratings: [],
      });
      
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const [editUser, setEditUser] = useState<Account>({
        userId: 0,
        name: '',
        phone: '',
        email: '',
        role: 'Buyer',
        address: '',
        orders: [],
        complaints: [],
        ratings: [],
    });
    const { accounts,loading,error} = useAccounts();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [rows, setRows] = useState(accounts);

    const handleCheckRow = (index: number) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter(i => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    }

    const handleCheckAll = () => {
        if (selectAll) {
            setSelectedRows([]);
            setSelectAll(false);
        } else {
            setSelectedRows(Array.from({ length: rows.length }, (_, i) => i));
            setSelectAll(true);
        }
    }

    const handleAddUser = () => {
        setRows([...rows, newUser]);
        setShowAddModal(false);
        setNewUser({userId: 0,
            name: '',
            phone: '',
            email: '',
            role: 'Buyer', 
            address: '',
            orders: [],
            complaints: [],
            ratings: [],}
        );
    }

    const handleDelete = () => {
        setRows(rows.filter((_, idx) => !selectedRows.includes(idx)));
        setSelectedRows([]);
        setSelectAll(false);
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const idx = selectedRows[0];
            setEditUser(rows[idx]);
            setEditIndex(idx);
            setShowEditModal(true);
        }
    };

    // Lưu thông tin user sau khi edit
    const handleSaveEdit = () => {
        if (editIndex !== null) {
            const updatedRows = [...rows];
            updatedRows[editIndex] = editUser;
            setRows(updatedRows);
            setShowEditModal(false);
            setSelectedRows([]);
            setEditIndex(null);
        }
    };

    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text.length > 0) {
            const filteredRows = accounts.filter((user) =>
                user.name.toLowerCase().includes(text.toLowerCase()) ||
                user.phone.toLowerCase().includes(text.toLowerCase()) ||
                user.email.toLowerCase().includes(text.toLowerCase()) ||
                user.role.toLowerCase().includes(text.toLowerCase()) ||
                user.address.toLowerCase().includes(text.toLowerCase())
            );
            setRows(filteredRows);
        }
        else {
            setRows(accounts);
        }
    }

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText])

    return (
        <View style={styles.bg}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>EggOEgg <Text style={styles.manager}>Manager</Text></Text>
                <View style={styles.navRow}>
                    <TouchableOpacity style={styles.navBtn} onPress={() => router.replace('../W_StartScreen')}>
                        <Text style={[styles.navText, { color: '#034C53' }]}>SIGNOUT</Text></TouchableOpacity>
                </View>
            </View>

            {/* Search & Actions */}
            <View style={styles.actionRow}>
                <TextInput
                    style={[styles.searchBox, styles.searchText]}
                    onChangeText={setSearchText}
                    placeholder='Searching...'>
                </TextInput>
                <View style={styles.actionBtns}>
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: '#034C53' }]}
                        onPress={() => setShowAddModal(true)}>
                        <Text style={styles.actionBtnText}>ADD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: selectedRows.length > 0 ? '#034C53' : '#bbb' }]}
                        disabled={selectedRows.length === 0}
                        onPress={handleDelete}>
                        <Text style={styles.actionBtnText}>DELETE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: selectedRows.length === 1 ? '#034C53' : '#bbb' }]}
                        disabled={selectedRows.length !== 1}
                        onPress={handleEdit}>
                        <Text style={styles.actionBtnText}>EDIT</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Table */}
            <ScrollView horizontal style={styles.tableWrapper}>
                <View>
                    {/* Table Header */}
                    <View style={[styles.row, styles.headerRow]}>
                        <TouchableOpacity onPress={handleCheckAll} style={styles.checkbox}>
                            <View style={[styles.checkboxBox, selectAll && styles.checkboxChecked]}>
                                {selectAll && <Text style={styles.checkboxTick}>✓</Text>}
                            </View>
                        </TouchableOpacity>
                        {columns.map((col, idx) => (
                            <Text key={idx} style={[styles.cell, styles.headerCell]}>{col}</Text>
                        ))}
                    </View>
                    {/* Table Body */}
                    <ScrollView>
                        {rows.map((row, idx) => (
                            <View key={idx} style={styles.row}>
                                <TouchableOpacity onPress={() => handleCheckRow(idx)} style={styles.checkbox}>
                                    <View style={[styles.checkboxBox, selectedRows.includes(idx) && styles.checkboxChecked]}>
                                        {selectedRows.includes(idx) && <Text style={styles.checkboxTick}>✓</Text>}
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.cell}>{idx + 1}</Text>
                                <Text style={styles.cell}>{row.userId}</Text>
                                <Text style={styles.cell}>{row.name}</Text>
                                <Text style={styles.cell}>{row.phone}</Text>
                                <Text style={styles.cell}>{row.email}</Text>
                                <Text style={styles.cell}>{row.role}</Text>
                                <Text style={styles.cell}>{row.address}</Text>
                                <Text style={styles.cell}>{row.email}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
            {/* Add User Modal */}
            <Modal
                visible={showAddModal}
                animationType="fade"
                transparent
                onRequestClose={() => setShowAddModal(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: 20,
                        width: '90%',
                        maxWidth: 400,
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Add User</Text>
                        <ScrollView>
                            <TextInput
                                placeholder="Full Name"
                                value={newUser?.name}
                                onChangeText={text => setNewUser({ ...newUser, name: text })}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Numbers"
                                value={newUser?.phone}
                                onChangeText={text => setNewUser({ ...newUser, phone: text })}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Email"
                                value={newUser?.email}
                                onChangeText={text => setNewUser({ ...newUser, email: text })}
                                style={styles.input}/>
                            <Picker
                                selectedValue={newUser.role}
                                onValueChange={value => setNewUser({ ...newUser, role: value as Role })}
                                style={styles.input}
                              >
                                <Picker.Item label="Buyer" value="Buyer" />
                                <Picker.Item label="Seller" value="Seller" />
                                <Picker.Item label="Admin" value="Admin" />
                              </Picker>
                            <TextInput
                                placeholder="Address"
                                value={newUser.address}
                                onChangeText={text => setNewUser({ ...newUser, address: text })}
                                style={styles.input}
                            />
                            {/* <TextInput
                                placeholder="Date Create"
                                value={newUser.dateCreate}
                                onChangeText={text => setNewUser({ ...newUser, dateCreate: text })}
                                style={styles.input}
                            /> */}
                            {/* <TextInput
                                placeholder="Note"
                                value={newUser.note}
                                onChangeText={text => setNewUser({ ...newUser, note: text })}
                                style={styles.input}
                            /> */}
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 }}>
                            <TouchableOpacity onPress={() => setShowAddModal(false)} style={[styles.actionBtn, { backgroundColor: '#bbb', marginRight: 8 }]}>
                                <Text style={styles.actionBtnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleAddUser} style={[styles.actionBtn, { backgroundColor: '#034C53' }]}>
                                <Text style={styles.actionBtnText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Edit User Modal */}
            <Modal
                visible={showEditModal}
                animationType="fade"
                transparent
                onRequestClose={() => setShowEditModal(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: 20,
                        width: '90%',
                        maxWidth: 400,
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Edit User</Text>
                        <ScrollView>
                            <TextInput placeholder="Full Name" value={editUser.name} onChangeText={text => setEditUser({ ...editUser, name: text })} style={styles.input} />
                            <TextInput placeholder="Numbers" value={editUser.phone} onChangeText={text => setEditUser({ ...editUser, phone: text })} style={styles.input} />
                            <TextInput placeholder="Email" value={editUser.email} onChangeText={text => setEditUser({ ...editUser, email: text })} style={styles.input} />
                            <Picker
                                selectedValue={newUser.role}
                                onValueChange={value => setNewUser({ ...newUser, role: value as Role })}
                                style={styles.input}
                                >
                                <Picker.Item label="Buyer" value="Buyer" />
                                <Picker.Item label="Seller" value="Seller" />
                                <Picker.Item label="Admin" value="Admin" />
                            </Picker>
                            <TextInput placeholder="Address" value={editUser.address} onChangeText={text => setEditUser({ ...editUser, address: text })} style={styles.input} />
                            {/* <TextInput placeholder="Date Create" value={editUser.dateCreate} onChangeText={text => setEditUser({ ...editUser, dateCreate: text })} style={styles.input} /> */}
                            {/* <TextInput placeholder="Note" value={editUser.note} onChangeText={text => setEditUser({ ...editUser, note: text })} style={styles.input} /> */}
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 }}>
                            <TouchableOpacity onPress={() => setShowEditModal(false)} style={[styles.actionBtn, { backgroundColor: '#bbb', marginRight: 8 }]}>
                                <Text style={styles.actionBtnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSaveEdit} style={[styles.actionBtn, { backgroundColor: '#034C53' }]}>
                                <Text style={styles.actionBtnText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#ebebeb',
        padding: 12,
    },
    header: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#d17878',
    },
    manager: {
        fontSize: 12,
        color: '#b86d6d',
    },
    navRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navBtn: {
        marginHorizontal: 8,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 10,
    },
    navText: {
        fontWeight: 'bold',
        color: '#fa8888',
    },
    activeBtn: {
        backgroundColor: '#fa8888',
    },
    activeText: {
        color: '#fff',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchBox: {
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 36,
        width: 260,
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    searchText: {
        color: '#bbb',
        fontStyle: 'italic',
    },
    actionBtns: {
        flexDirection: 'row',
    },
    actionBtn: {
        paddingHorizontal: 22,
        paddingVertical: 8,
        borderRadius: 6,
        marginLeft: 10,
    },
    actionBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    tableWrapper: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
        minHeight: 36,
    },
    checkbox: {
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxBox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#034C53',
        borderRadius: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#034C53',
    },
    checkboxTick: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    headerRow: {
        backgroundColor: '#f4f4f4',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerCell: {
        fontWeight: 'bold',
        color: '#034C53',
    },
    cell: {
        minWidth: 200,
        paddingVertical: 8,
        paddingHorizontal: 8,
        fontSize: 14,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 8,
        marginBottom: 10,
        fontSize: 15,
        backgroundColor: '#fafafa',
    },
});

export default UserManagement;