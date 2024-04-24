<?php 
include("conn/database.php");
error_reporting(E_ALL);


// function formatDates($dateArray) {
//     foreach ($dateArray as &$item) {
//         $dateStart = DateTime::createFromFormat('l, F j, Y', $item['date_start']);
//         $dateEnd = DateTime::createFromFormat('l, F j, Y', $item['date_end']);

//         $item['date_start'] = $dateStart->format('m/d/Y');
//         $item['date_end'] = $dateEnd->format('m/d/Y');
//     }
//     return $dateArray;
// }

function formatDates($dateArray) {
    foreach ($dateArray as &$item) {
        $dateStart = DateTime::createFromFormat('l, F j, Y', $item['date_start']);
        $dateEnd = DateTime::createFromFormat('l, F j, Y', $item['date_end']);

        // Check if the month and day have leading zeros and remove them if present
        $item['date_start'] = preg_replace('/^0(\d+)/', '$1', $dateStart->format('n/j/Y'));
        $item['date_end'] = preg_replace('/^0(\d+)/', '$1', $dateEnd->format('n/j/Y'));
    }
    return $dateArray;
}

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET['name']) && $_GET['name'] == 'calendar') {

    $currentDate = date('l, F j, Y'); // Get the current date in the same format as stored in the database
    $sql = "SELECT date_start, date_end FROM bookings WHERE STR_TO_DATE(date_start, '%W, %M %e, %Y') >= STR_TO_DATE(:currentDate, '%W, %M %e, %Y')";
    $query = $dbh->prepare($sql);
    $query->bindParam(':currentDate', $currentDate, PDO::PARAM_STR);
    if($query->execute()){
        $bookings = $query->fetchAll(PDO::FETCH_ASSOC);
        $bookings = formatDates($bookings);
        file_put_contents('form_data.log', print_r($bookings, true), FILE_APPEND | LOCK_EX);
        $response = ['success' => true, 'message' => 'Form data processed successfully', 'data' => $bookings];
        http_response_code(200); // OK
        echo json_encode($response);
    } else {
        $response = ['success' => false, 'message' => 'Invalid request method'];
        http_response_code(400);
        echo json_encode($response);
    }
}elseif($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET['name']) && $_GET['name'] == 'gallery') {

    $sql = "SELECT * FROM gallery WHERE  status=:status";
    $status = "active";
    $query = $dbh->prepare($sql);
    $query->bindParam(':status', $status, PDO::PARAM_STR);
    if($query->execute()){
        $bookings = $query->fetchAll(PDO::FETCH_ASSOC);
        file_put_contents('form_data.log', print_r($bookings, true), FILE_APPEND | LOCK_EX);
        $response = ['success' => true, 'message' => 'Form data processed successfully', 'data' => $bookings];
        http_response_code(200); // OK
        echo json_encode($response);
    } else {
        $response = ['success' => false, 'message' => 'Invalid request method'];
        http_response_code(400);
        echo json_encode($response);
    }
}elseif ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_GET['name']) && $_GET['name'] == 'contact_message') {

    $recepient = "admin";
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL); 
    $name = trim($_POST['name']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);
    $isRead = 0;

        // Insert user into database
        $sql = "INSERT INTO messages (recepient, email, name, message, subject, is_read) VALUES (:recepient, :email, :name, :message, :subject, :is_read)";
        $query = $dbh->prepare($sql);
        $query->bindParam(':recepient', $recepient, PDO::PARAM_STR);
        $query->bindParam(':email', $email, PDO::PARAM_STR);
        $query->bindParam(':name', $name, PDO::PARAM_STR);
        $query->bindParam(':message', $message, PDO::PARAM_STR);
        $query->bindParam(':subject', $subject, PDO::PARAM_STR);
        $query->bindParam(':is_read', $isRead, PDO::PARAM_NULL);
        
        if($query->execute() === TRUE){
            file_put_contents('form_data.log', print_r($_POST, true), FILE_APPEND | LOCK_EX);
            $response = ['success' => true, 'message' => 'Form data processed successfully', 'data' => "your message is received, we will get back shortly"];
            http_response_code(200); // OK
            echo json_encode($response);
        }else{
            $response = ['success' => false, 'message' => 'Invalid request method'];
            http_response_code(400);
            echo json_encode($response);
        }

}elseif ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_GET['name']) && $_GET['name'] == 'book_now') {

    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL); 
    $fullname = trim($_POST['fullname']);
    $date = trim($_POST['date']);

        // Insert user into database
        $sql = "INSERT INTO bookings (user_id, date_start) VALUES (:user_id, :date_start)";
        $query = $dbh->prepare($sql);
        $query->bindParam(':user_id', $recepient, PDO::PARAM_STR);
        $query->bindParam(':date_start', $email, PDO::PARAM_STR);
        
        if($query->execute() === TRUE){
            file_put_contents('form_data.log', print_r($bookings, true), FILE_APPEND | LOCK_EX);
            $response = ['success' => true, 'message' => 'Form data processed successfully', 'data' => "your message is received, we will get back shortly"];
            http_response_code(200); // OK
            echo json_encode($response);
        }else{
            $response = ['success' => false, 'message' => 'Invalid request method'];
            http_response_code(400);
            echo json_encode($response);
        }

}else{

    $response = ['success' => false, 'message' => 'Expecting query  '];
    http_response_code(400);
    echo json_encode($response);
}


function identifyInputType($input) {
    // Check if input is a valid email address
    if (filter_var($input, FILTER_VALIDATE_EMAIL) !== false) {
        return 'email';
    }
     // Check if input is a valid phone number
    if (preg_match('/^\+?\d{1,3}(\(\d{1,3}\))?\d{3,14}$/', $input)) {
        return 'phone';
    }
    // If input doesn't match email or phone number format, assume it's a regular string
    return 'booking_id';
}