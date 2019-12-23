import http from '@/http'

// peserta
export function postPeserta(data) {
    return http.post('mahasiswa', data)
}

// data mahasiswa
export function getDataMhs(id) {
    return http.get('mahasiswa/'+id)
}

export function editMhs(id, data) {
    return http.put('mahasiswa/'+id, data)
}

// data alamat
export function getNegara() {
    return http.get('data/negara')
}

export function getDaerah(id) {
    return http.get('data/daerah/'+id)
}

export function getKabupaten(id) {
    return http.get('data/kab/'+id)
}

export function getFullDaerah() {
    return http.get('data/daerah')
}

export function getFullKabupaten() {
    return http.get('data/kab')
}

// ganti password
export function gantiPassword(data) {
    return http.post('mahasiswa/gantipassword', data)
}

// login
export function postLogin(data) {
    return http.post('mahasiswa/login', data)
        .then(res => {
            window.localStorage.setItem('auth_token', res.data.data.api_token)
            window.localStorage.setItem('userdata', JSON.stringify(res.data.data))
            return res
        })
}

export function lupaPassword(data) {
    return http.post('mahasiswa/forgot', data)
}

// penyakit
export function getFullPenyakit() {
    return http.get('penyakit')
}

export function getPenyakitMhs(id) {
    return http.get('penyakitmhs/'+id)
}

export function postPenyakit(data) {
    return http.post('penyakitmhs', data)
}

export function deletePenyakitMhs(id) {
    return http.delete('penyakitmhs/delete/'+id)
}

// prestasi
export function postPrestasi(data) {
    return http.post('prestasimhs', data)
}

export function getPrestasi(id) {
    return http.get('prestasimhs/'+id)
}

export function deletePrestasi(id) {
    return http.delete('prestasimhs/'+id)
}

// keluarga
export function getKeluarga(id) {
    return http.get('keluarga/'+id)
}

export function postKeluarga(data) {
    return http.post('keluarga', data)
}

export function deleteKeluarga(id) {
    return http.delete('keluarga/'+id)
}

// berita
export function getBerita() {
    return http.get('blog')
}

// kelompok
export function getKelompok(id) {
    return http.get('kelompok/'+id)
}

// FAQ
export function getFAQ() {
    return http.get('faq')
}

// jadwal
export function getJadwal(id){
    return http.get('mahasiswa/jadwal/'+id)
}