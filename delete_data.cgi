#!/usr/bin/perl

# Name: Desai, Rutvik
# Class Account#: jadrn010
# Project #1

use CGI;
use DBI;

my $cgi = CGI->new;

my $sku = $cgi->param('sku');
my $image = $cgi->param('image');

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn010";
my $username = "jadrn010";
my $password = "shovel"; 
my $database_source = "dbi:mysql:$database:$host:$port";

my $newdbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $message = " ";


my $sql = $newdbh->prepare("delete from product where sku = '$sku';");
#$sql->execute() or die $DBI::errstr;

if ($sql->execute()) {

unlink $image;
$message = "Success";

}
else {
$message = "Error"
}
$sql->finish();
$newdbh->disconnect();

print "Content-type: text/html\n\n";
print $message;
