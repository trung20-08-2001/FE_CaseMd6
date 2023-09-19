import React from 'react';

function Page404() {
    return (
        <div style={styles.container}>
            <img
                src="https://mauwebsite.vn/wp-content/uploads/2021/10/loi-404.png"
                alt="Page Not Found"
                style={styles.image}
            />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Chiều rộng của container là 100% của màn hình
        height: '100vh', // Chiều cao của container là 100% chiều cao của viewport (màn hình)
        backgroundColor: 'green', // Màu nền xanh lá cây cho container
    },
    image: {
        width: '100%', // Chiều rộng của ảnh là 100% của container
        height: 'auto',
    },
};

export default Page404;
