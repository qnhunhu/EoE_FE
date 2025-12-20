import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const policyDatas = Array(5).fill({
    id: 'asdfexcv12ds',
    name: 'Policy A',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    note: 'Note',
});

const columns = [
    '#', 'ID', 'Name', 'Discription', 'Note'
];

const PolicyManagement = () => {
    const router = useRouter();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [newPolicy, setNewPolicy] = useState({
        id: '',
        name: '',
        description: '',
        note: '',
    });
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const [editPolicy, setEditPolicy] = useState({
        id: '',
        name: '',
        description: '',
        note: '',
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [rows, setRows] = useState(policyDatas);

    const handleCheckRow = (index: number) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter(i => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const handleCheckAll = () => {
        if (selectAll) {
            setSelectedRows([]);
            setSelectAll(false);
        } else {
            setSelectedRows(Array.from({ length: rows.length }, (_, i) => i));
            setSelectAll(true);
        }
    };

    const handleAddPolicy = () => {
        setRows([...rows, newPolicy]);
        setShowAddModal(false);
        setNewPolicy({
            id: '',
            name: '',
            description: '',
            note: '',
        });
    };

    const handleDelete = () => {
        setRows(rows.filter((_, idx) => !selectedRows.includes(idx)));
        setSelectedRows([]);
        setSelectAll(false);
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const idx = selectedRows[0];
            setEditPolicy(rows[idx]);
            setEditIndex(idx);
            setShowEditModal(true);
        }
    };

    const handleSaveEdit = () => {
        if (editIndex !== null) {
            const updatedRows = [...rows];
            updatedRows[editIndex] = editPolicy;
            setRows(updatedRows);
            setShowEditModal(false);
            setSelectedRows([]);
            setEditIndex(null);
        }
    };

    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text.length > 0) {
            const filteredRows = policyDatas.filter((policy) =>
                policy.name.toLowerCase().includes(text.toLowerCase()) ||
                policy.id.toLowerCase().includes(text.toLowerCase()) ||
                policy.description.toLowerCase().includes(text.toLowerCase()) ||
                policy.note.toLowerCase().includes(text.toLowerCase())
            );
            setRows(filteredRows);
        }
        else {
            setRows(policyDatas);
        }
    };

    useEffect(() => {
        handleSearch(searchText);
    }, [searchText]);

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
                    placeholder='Searching...'
                    value={searchText}
                />
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
                            <TouchableOpacity key={idx} style={styles.row} onPress={() => handleCheckRow(idx)}>
                                <TouchableOpacity onPress={() => handleCheckRow(idx)} style={styles.checkbox}>
                                    <View style={[styles.checkboxBox, selectedRows.includes(idx) && styles.checkboxChecked]}>
                                        {selectedRows.includes(idx) && <Text style={styles.checkboxTick}>✓</Text>}
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.cell}>{idx + 1}</Text>
                                <Text style={styles.cell}>{row.id}</Text>
                                <Text style={styles.cell}>{row.name}</Text>
                                <Text style={[styles.cell, { minWidth: 400 }]}>{row.description}</Text>
                                <Text style={styles.cell}>{row.note}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Add Policy Modal */}
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
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Add Policy</Text>
                        <ScrollView>
                            <TextInput
                                placeholder="ID"
                                value={newPolicy.id}
                                onChangeText={text => setNewPolicy({ ...newPolicy, id: text })}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Name"
                                value={newPolicy.name}
                                onChangeText={text => setNewPolicy({ ...newPolicy, name: text })}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Description"
                                value={newPolicy.description}
                                onChangeText={text => setNewPolicy({ ...newPolicy, description: text })}
                                style={[styles.input, { minHeight: 80 }]}
                                multiline
                            />
                            <TextInput
                                placeholder="Note"
                                value={newPolicy.note}
                                onChangeText={text => setNewPolicy({ ...newPolicy, note: text })}
                                style={styles.input}
                            />
                        </ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 }}>
                            <TouchableOpacity onPress={() => setShowAddModal(false)} style={[styles.actionBtn, { backgroundColor: '#bbb', marginRight: 8 }]}>
                                <Text style={styles.actionBtnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleAddPolicy} style={[styles.actionBtn, { backgroundColor: '#034C53' }]}>
                                <Text style={styles.actionBtnText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Edit Policy Modal */}
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
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Edit Policy</Text>
                        <ScrollView>
                            <TextInput
                                placeholder="ID"
                                value={editPolicy.id}
                                onChangeText={text => setEditPolicy({ ...editPolicy, id: text })}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Name"
                                value={editPolicy.name}
                                onChangeText={text => setEditPolicy({ ...editPolicy, name: text })}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Description"
                                value={editPolicy.description}
                                onChangeText={text => setEditPolicy({ ...editPolicy, description: text })}
                                style={[styles.input, { minHeight: 80 }]}
                                multiline
                            />
                            <TextInput
                                placeholder="Note"
                                value={editPolicy.note}
                                onChangeText={text => setEditPolicy({ ...editPolicy, note: text })}
                                style={styles.input}
                            />
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

export default PolicyManagement;